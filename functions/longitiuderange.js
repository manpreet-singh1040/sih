

const fun=(sideLengthKm,x,y)=>{
const sideLengthRadians = sideLengthKm / 111.32;
const ans=(sideLengthRadians / (2 * Math.cos(x)));
return ans;

}
module.exports = {fun:fun};