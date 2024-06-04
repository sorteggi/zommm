
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
      const firebaseConfig = {
        apiKey: "AIzaSyDvvM6v5KTT5AWn0W1_xEU7WmYb32ycD08",
        authDomain: "came-54f87.firebaseapp.com",
        databaseURL: "https://came-54f87-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "came-54f87",
        storageBucket: "came-54f87.appspot.com",
        messagingSenderId: "806978345562",
        appId: "1:806978345562:web:6290b3bb8812268e2d9663",
        measurementId: "G-EDHCEV8KX5"
      };
      const app = initializeApp(firebaseConfig);

      import {getDatabase, ref, child, get , onValue, set ,update, remove} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
      const db = getDatabase();
let x = 0;
let y = 0;

const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
function resetValues() {
  set(ref(db, 'position'),{
    xpos : 0,
    ypos : 0
  })  
}
 // Event listeners for mousedown and mouseup events
  upBtn.addEventListener('mousedown', function() {
    set(ref(db, 'position'),{
      xpos : 0,
      ypos : 1
    }) 
   });
    downBtn.addEventListener('mousedown', function() {
      set(ref(db, 'position'),{
        xpos : 0,
        ypos : -1
      })  
 });
  leftBtn.addEventListener('mousedown', function() {
    set(ref(db, 'position'),{
      xpos : -1,
      ypos : 0
    }) 
  });
 rightBtn.addEventListener('mousedown', function() {
  set(ref(db, 'position'),{
    xpos : 1,
    ypos : 0
  }) 
 });
      upBtn.addEventListener('mouseup', resetValues);
      downBtn.addEventListener('mouseup', resetValues);
      leftBtn.addEventListener('mouseup', resetValues);
      rightBtn.addEventListener('mouseup', resetValues);




      let services = null;

      document.getElementById("connect").onclick = async () => {
          try {
              const device = await microbit.requestMicrobit(window.navigator.bluetooth);
              if (device) {
                  services = await microbit.getServices(device);
              }
          } catch (error) {
              console.log(`Error connecting`);
          }
      };
      const positionRef = ref(db, 'position');

      // Listen for changes to the 'position' node
      onValue(positionRef, (snapshot) => {
        const position = snapshot.val();
        // Extract the values of xpos and ypos
        const { xpos, ypos } = position;
        // Create a space-separated string of the values
        const text = `${xpos} ${ypos}`;
        // Do something with the position string
        if (services && services.uartService && text) {
          // Append newline character (\n) to the input text
          const textWithNewline = text + "\n";		
      
          // Convert the input text (with newline) to Uint8Array
          const encoder = new TextEncoder();
          const encodedText = encoder.encode(textWithNewline);
      
          // Send the encoded text to the micro:bit asynchronously
          services.uartService.send(encodedText)
        }
      });
