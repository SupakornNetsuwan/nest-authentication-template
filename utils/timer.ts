const timer = (duration: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration)
    })
}

export default timer