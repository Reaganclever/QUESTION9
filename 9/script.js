async function startScreening()
{
    // Load XML file
    const response = await fetch("criteria.xml");

    const data = await response.text();

    const parser = new DOMParser();

    const xml = parser.parseFromString(data, "application/xml");

    // Read requirements from XML
    const minimumAge = parseInt(
        xml.getElementsByTagName("minimumAge")[0].textContent
    );

    const minimumExperience = parseInt(
        xml.getElementsByTagName("minimumExperience")[0].textContent
    );

    // Collect user input using prompt()
    let age = prompt("Enter Applicant Age:");

    let experience = prompt("Enter Years of Experience:");

    // Validation
    if(age === "" || experience === "" || age === null || experience === null)
    {
        alert("All fields are required!");
        return;
    }

    age = Number(age);
    experience = Number(experience);

    if(isNaN(age) || isNaN(experience))
    {
        alert("Please enter valid numbers only!");
        return;
    }

    // Selection Function
    function checkApplicant(age, experience)
    {
        if(age >= minimumAge && experience >= minimumExperience)
        {
            return "Selected";
        }
        else
        {
            return "Not Selected";
        }
    }

    let result = checkApplicant(age, experience);

    // Display Results
    const output = document.getElementById("output");

    output.innerHTML = `
        <strong>Applicant Age:</strong> ${age} Years <br><br>

        <strong>Experience:</strong> ${experience} Years <br><br>

        <strong>Status:</strong> 
        <span style="
            color:${result === "Selected" ? "#00ff99" : "#ff4d4d"};
            font-size:22px;
            font-weight:bold;
        ">
            ${result}
        </span>
    `;
}