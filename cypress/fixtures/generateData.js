function generateEmail() {
    return `example${Date.now()}@mail.com`
}

function generatePass() {
    return `gAw${Date.now()}`.slice(0, 13);
}

export {generateEmail, generatePass}