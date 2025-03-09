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
//connect to gatt server
let deviceName = device.gatt.device.name;
const server = await device.gatt.connect();
