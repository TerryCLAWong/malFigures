
export function HandleInputStringChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
        [name]: value //[] is the value of the variable
    })
}