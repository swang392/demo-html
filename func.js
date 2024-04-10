export function isRightHandRaised(person) {
    // get joint location
    const shoulderRightY = person.joints[12].position.y
    const wristRightY = person.joints[14].position.y
    const elbowRightY = person.joints[13].position.y

    // check arm raise
    if (wristRightY < shoulderRightY && elbowRightY < shoulderRightY) 
    {
        return true
    } 
    else 
    {
        return false
    }
}

export function isLeftHandRaised(person) {
    // get joint location
    const shoulderLeftY = person.joints[5].position.y
    const wristLeftY = person.joints[7].position.y
    const elbowLeftY = person.joints[6].position.y

    // check arm raise
    if (wristLeftY < shoulderLeftY && elbowLeftY < shoulderLeftY) 
    {
        return true
    } 
    else 
    {
        return false
    }
}

export function personOnSide(person){
    if (person["x_pos"] < -1)
    {
        return -1
    }
    else if (person["x_pos"] > 1)
    {
        return 1
    }
    else
    {
        return 0
    }
}

export function areBothHandsRaised(person) {
    return isLeftHandRaised(person) && isRightHandRaised(person)
}

export function countPeople(frame) {
    return frame.people.length;
}