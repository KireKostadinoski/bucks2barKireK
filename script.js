window.onload = () => {
  // Input with id username on change
  const usernameInput = document.getElementById("username");
  usernameInput.addEventListener("input", () => {
    const username = usernameInput.value;

    // Regex to check if username has at least one letter, one number, one special character, and is 8 characters long
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{8,}$/;
    if (regex.test(username)) {
      //set the username border to green
      document.getElementById("username").style.borderColor = "green";
    } else {
      //set the username border to red
      document.getElementById("username").style.borderColor = "red";
    }

  });

  document.getElementById("download").addEventListener("click", () => {
    const canvas = document.getElementById("myChart");
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "chart.png";
    link.click();
  });

  // Get the context of the canvas element we want to select
  const ctx = document.getElementById("myChart").getContext("2d");

  // Create a new Chart object
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Income",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  document.getElementById("chart-tab").addEventListener("click", () => {
    // Income
    const incomeData = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ].map((month) => Number(document.getElementById(`${month}-income`).value) || 0);

    // Expenses
    const expensesData = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ].map((month) => Number(document.getElementById(`${month}-expenses`).value) || 0);

    // Update the datasets in the chart
    myChart.data.datasets[0].data = incomeData;
    myChart.data.datasets[1].data = expensesData;

    // Update the chart to reflect the new data
    myChart.update();
  });
};
