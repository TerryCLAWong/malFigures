
export function HandleInputStringChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
        [name]: value //[] is the value of the variable
    })
}


export function HandleOptionSelect(e) {
    var options = []
    var i
    const id = e.target.id
    const value = document.getElementById(e.target.id).value;

    if (id === "upper") {
        for (i = 1; i <= value; i++) {
            const newOption = {
                value: i,
                label: i,
            }
            options.push(newOption)
        }
        this.setState({
            lowerOptions: options,
            upper: value
        })   
    } else if (id === "lower") {
        for (i = value; i <= 10; i++) {
            const newOption = {
                value: i,
                label: i,
            }
            options.push(newOption)
        }
        this.setState({
            upperOptions: options,
            lower: value
        })
    } else if (id === "commonCount") {
        this.setState({
            commonStudioCount: document.getElementById("commonCount").value,
        })
    }
}
