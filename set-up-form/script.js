function yesOrNoCheckboxPressed(answer) {
  if (answer == 1) {
    document.getElementById("no").checked = false;
    let showOnYes = document.getElementsByClassName("showonyes");

    for (let i = 0; i < showOnYes.length; i++) {
      showOnYes[i].style.visibility = "visible";
    }
  } else if (answer == 0) {
    document.getElementById("yes").checked = false;
    let showOnYes = document.getElementsByClassName("showonyes");

    for (let i = 0; i < showOnYes.length; i++) {
      showOnYes[i].style.visibility = "hidden";
    }
  }
}

function timeCheckboxClick(checkbox) {
  let parent = checkbox.parentElement;
  let calltimes = parent.querySelectorAll(".time");
  for (let i = 0; i < calltimes.length; i++) {
    if (checkbox.checked) {
      calltimes[i].style.visibility = "visible";
    } else {
      calltimes[i].style.visibility = "hidden";
    }
  }
}

class TimePicker {
  constructor(id, timeId) {
    this.timeWrapper = document.getElementById(`timeWrapper${id}`);
    this.timeInput = document.getElementById(timeId);
    this.timeOptions = document.getElementById(`timeOptions${id}`);

    this.allOptions = [];

    // Populate hours and minutes select options
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const option = `${formattedHour}:${formattedMinute}`;
        this.allOptions.push(option);
      }
    }

    // Toggle the options dropdown when clicking on the custom select
    this.timeInput.addEventListener("click", () => {
      this.timeWrapper.classList.toggle("open");
      this.filterOptions("");
    });

    // Close the options dropdown when clicking outside of it
    window.addEventListener("click", (event) => {
      if (
        !event.target.matches(".custom-select") &&
        !event.target.matches(".custom-options div")
      ) {
        this.timeWrapper.classList.remove("open");
      }
    });

    // Handle direct time entry
    this.timeInput.addEventListener("input", () => {
      const enteredText = this.timeInput.textContent;
      this.filterOptions(enteredText);
    });
  }

  filterOptions(query) {
    const filteredOptions = this.allOptions.filter((option) =>
      option.includes(query)
    );
    this.updateOptions(filteredOptions);
  }

  updateOptions(options) {
    this.timeOptions.innerHTML = "";
    options.forEach((option) => {
      const div = document.createElement("div");
      div.textContent = option;
      div.addEventListener("click", () => {
        this.updateTime(option);
        this.timeWrapper.classList.remove("open");
      });
      this.timeOptions.appendChild(div);
    });
  }

  updateTime(time) {
    this.timeInput.textContent = time;
  }
}

const daysId = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Initialize time pickers
const mondayFrom = new TimePicker(1, "timeMondayFrom");
const mondayTo = new TimePicker(2, "timeMondayTo");
const tuesdayFrom = new TimePicker(3, "timeTuesdayFrom");
const tuesdayTo = new TimePicker(4, "timeTuesdayTo");
const wednesdayFrom = new TimePicker(5, "timeWednesdayFrom");
const wednesdayTo = new TimePicker(6, "timeWednesdayTo");
const thursdayFrom = new TimePicker(7, "timeThursdayFrom");
const thursdayTo = new TimePicker(8, "timeThursdayTo");
const fridayFrom = new TimePicker(9, "timeFridayFrom");
const fridayTo = new TimePicker(10, "timeFridayTo");
const saturdayFrom = new TimePicker(11, "timeSaturdayFrom");
const saturdayTo = new TimePicker(12, "timeSaturdayTo");
const sundayFrom = new TimePicker(13, "timeSundayFrom");
const sundayTo = new TimePicker(14, "timeSundayTo");

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const conditions = document.getElementById("conditions").value;
  const callLength = document.getElementById("callLength").value;
  const countryOrTimezone = document.getElementById("country").value;

  let availability = {
    Monday: [false, , null],
    Tuesday: [false, null, null],
    Wednesday: [false, null, null],
    Thursday: [false, null, null],
    Friday: [false, null, null],
    Saturday: [false, null, null],
    Sunday: [false, null, null],
  };

  for (let i = 0; i < daysId.length; i++) {
    if (document.getElementById(daysId[i]).checked) {
      let fromId = `time${daysId[i]}From`;
      let toId = `time${daysId[i]}To`;

      availability[daysId[i]][0] = true;
      availability[daysId[i]][1] = document.getElementById(fromId).innerHTML;
      availability[daysId[i]][2] = document.getElementById(toId).innerHTML;
    }
  }

  const info = document.getElementById("info").value;

  const user = {
    fullName: name,
    clientConditions: conditions,
    lenghtCall: callLength,
    countryTimezone: countryOrTimezone,
    timeAvailability: availability,
    aditionalInfo: info,
  };

  const userString = JSON.stringify(user);

  Email.send({
    SecureToken: "c46923a8-7f07-460d-80b7-6806f00b5ee5",
    To: "dantevee4@gmail.com",
    From: "dantevee4@gmail.com",
    Subject: `${user.fullName} FILLED THE SET-UP FROM!📣🔥`,
    Body: userString,
  }).then(alert("Form has been submited!🥰"));
  location.reload();
});
