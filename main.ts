function decimalToBinaryList (num: number, minListLength: number) {
    numCopy = num
    binaryList = []
    while (numCopy > 0) {
        binaryList.unshift(numCopy % 2)
        numCopy = Math.idiv(numCopy, 2)
    }
    while (binaryList.length < minListLength) {
        binaryList.unshift(0)
    }
    return binaryList
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    tickets = []
    for (let index = 0; index < 20; index++) {
        tickets.push(randint(1, 999))
    }
    game.splash("Tickets: ", tickets)
    game.splash(groupRaffle(tickets, game.askForNumber("Enter Group Raffle Winning Number: ")))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tickets = []
    for (let index = 0; index < 1000; index++) {
        tickets.push(randint(1, 999))
    }
    game.splash("Tickets: ", tickets)
    game.splash(pairRaffle(tickets, game.askForNumber("Enter Pair Raffle Winning Number: ")))
})
function pairRaffle (ticketList: number[], winningNumber: number) {
    if (ticketList.length > 1) {
        val1 = ticketList[0]
        val2 = ticketList[1]
        distance = Math.abs(winningNumber - (val1 + val2))
        for (let outer = 0; outer <= ticketList.length - 2; outer++) {
            inner = outer + 1
            while (inner < ticketList.length) {
                newDistance = Math.abs(winningNumber - (ticketList[outer] + ticketList[inner]))
                if (newDistance == 0) {
                    game.splash("Winning Pair Found!")
                    return [ticketList[outer], ticketList[inner]]
                } else if (newDistance < distance) {
                    val1 = ticketList[outer]
                    val2 = ticketList[inner]
                    distance = newDistance
                }
                inner += 1
            }
        }
        game.splash("No Winning Pair Found!")
        return [val1, val2]
    } else {
        game.splash("List length too small")
        return []
    }
}
function groupRaffle (ticketList: number[], winningNumber: number) {
    bestTicketNums = [ticketList[0]]
    bestGroupSum = ticketList[0]
    numOfGroups = 2 ** ticketList.length
    for (let groupCombination = 0; groupCombination <= numOfGroups - 1; groupCombination++) {
        groupBits = decimalToBinaryList(groupCombination + 1, ticketList.length)
        groupTicketNums = []
        groupSum = 0
        for (let bitListIndex = 0; bitListIndex <= groupBits.length - 1; bitListIndex++) {
            if (groupBits[bitListIndex] == 1) {
                thisTicket = ticketList[bitListIndex]
                groupSum += thisTicket
                groupTicketNums.push(thisTicket)
            }
        }
        if (groupSum == winningNumber) {
            game.splash("Winning Group Found!")
            return groupTicketNums
        } else if (Math.abs(groupSum - winningNumber) < Math.abs(bestGroupSum - winningNumber)) {
            bestTicketNums = groupTicketNums
            bestGroupSum = groupSum
        }
    }
    game.splash("No Winning Group Found!", "Closest Sum: " + bestGroupSum)
    return bestTicketNums
}
let thisTicket = 0
let groupSum = 0
let groupTicketNums: number[] = []
let groupBits: number[] = []
let numOfGroups = 0
let bestGroupSum = 0
let bestTicketNums: number[] = []
let newDistance = 0
let inner = 0
let distance = 0
let val2 = 0
let val1 = 0
let tickets: number[] = []
let binaryList: number[] = []
let numCopy = 0
game.showLongText("'A' for pair raffle and \\n'B' for group raffle", DialogLayout.Center)
