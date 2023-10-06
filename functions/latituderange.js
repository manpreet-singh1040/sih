

const fun=(sideLengthKm,x,y)=>{
    const sideLengthRadians = sideLengthKm / 111.32;
    return (sideLengthRadians / 2);
}

module.exports= {fun:fun};