import React, { Component } from 'react'

class MemeGenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data
        this.setState({ allMemeImgs: memes })
      })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSumbit(event) {
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randMemeImg = this.state.allMemeImgs[randNum].url
    this.setState({ randomImg: randMemeImg })
  }

  render() {
    return (
      <div>
        <form className="meme-form">
          <input
            name="topText"
            type="text"
            placeholder="top text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            name="bottomText"
            type="text"
            placeholder="bottom text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSumbit}>Generate</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemeGenerator
