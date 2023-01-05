let date = Date();

console.log(getD(date))

const getD = (curDate) => {
    let d = (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear();
    
    let y = parseInt(curDate.getHours());
    let en = ""
    
    if (y > 12) {
        y -= 12;
        en = "p.m";
    } else if (y == 0) {
        y = 12
        en = "a.m";
    } else {
        en = "a.m"
    }
    
    y += ":" + curDate.getMinutes() + " " + en;
    
    return y + " " + d
}


