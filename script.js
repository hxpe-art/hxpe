const button = document.getElementById("getDetails");
const details = document.getElementById("details");
button.addEventListener("click", async () => {
  try {
  } catch(err) {
    console.error(err);
    alert("error occured");
  }
});
//request device
const device = await navigator.bluetooth.requestDevice({
  optionalServices: ["battery_service", "device_information"],
  acceptAllDevices: true,
});
//connect to gatt server, waiting for promise
let deviceName = device.gatt.device.name;
const server = await device.gatt.connect();
//get service (bluetoooth thing?)
const batteryService = await server.getPrimaryService("battery_service");
const infoService = await server.getPrimaryService("device_information");
//getting characteristics, promise
const infoCharacterists = await infoService.getCharacteristics();
console.log(infoCharacteristics)
let infoValues = [];
const promise = new Promise((resolve, reject) => {
  infoCharacteristics.forEach(async (characteristic, index, array) => {
    //returns a buffer?? used to represent a fixed-length sequence of bytes
    const value = await characteristic.readValue();
    console.log(new TextDecoder().decode(value));
    //converts to string, sequence of numbers/letters
    infoValues.push(new TextDecoder().decode(value));
    if (index === array.length -1) resolve();
  });
});
promise.then(() => {
  //displaying everything
  details.innerHTML = `
    Device Name - ${deviceName}<br />
     Battery Level - ${batteryPercent}%<br />
  Device Information:
<u1>
  ${infoValues.map((value) => `<li>${value}</li>`).join("")}
</u1>
  `;
});
  
