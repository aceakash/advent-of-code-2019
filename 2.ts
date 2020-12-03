console.log(problem1(getInput()))
console.log(problem2(getInput()))

function problem2(input: string): number {
    let instructions: number[] = parseInput(input)

    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            if (valueAtPos0AfterHalt([...instructions], noun, verb) === 19690720) {
                return 100 * noun + verb
            }
        }
    }
}

function problem1(input: string) {
    let instructions: number[] = parseInput(input)
    return valueAtPos0AfterHalt(instructions, 12, 2)
}


function valueAtPos0AfterHalt(instructions: number[], noun: number, verb: number): number {

    instructions[1] = noun
    instructions[2] = verb

    let opPointer = 0
    let opCode = instructions[opPointer];
    while (opCode !== 99) {
        let firstArgPos = instructions[opPointer+1];
        let secondArgPos = instructions[opPointer+2];
        let outputPos = instructions[opPointer+3];

        let firstArg = instructions[firstArgPos]
        let secondArg = instructions[secondArgPos]

        if (opCode === 1) {
            instructions[outputPos] = firstArg + secondArg
        } else if (opCode === 2) {
            instructions[outputPos] = firstArg * secondArg
        } else {
            throw new Error(`Unknown opcode ${opCode}`)
        }

        opPointer += 4
        opCode = instructions[opPointer];
    }

    return instructions[0]
}

function parseInput(input: string): number[] {
    return input.trim().split(',').map(s => parseInt(s.trim()))
}

function getInput() {
    return `1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,5,23,1,9,23,27,2,27,6,31,1,5,31,35,2,9,35,39,2,6,39,43,2,43,13,47,2,13,47,51,1,10,51,55,1,9,55,59,1,6,59,63,2,63,9,67,1,67,6,71,1,71,13,75,1,6,75,79,1,9,79,83,2,9,83,87,1,87,6,91,1,91,13,95,2,6,95,99,1,10,99,103,2,103,9,107,1,6,107,111,1,10,111,115,2,6,115,119,1,5,119,123,1,123,13,127,1,127,5,131,1,6,131,135,2,135,13,139,1,139,2,143,1,143,10,0,99,2,0,14,0`
}