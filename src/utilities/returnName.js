export const returnName = (fullName) => {
    if(fullName){
        const name = fullName.split(" ")[0]
        return name
    }
    else{
        return
    }
}