const menuIcon = document.querySelector("#menu")
const navLinks = document.querySelector(".navLinks")
const validationContainer = document.getElementById("validationContainer")
const icons = document.getElementsByClassName('icon')

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

const sendMessage = async function () {
  let fName = document.getElementById("fname")
  let fEmail = document.getElementById("email")
  let fMessage = document.getElementById("message")

  let formData = {
    name: fName.value,
    email: fEmail.value,
    message: fMessage.value,
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      validationContainer.style.display = "block"
      validationContainer.style.border = "1px solid red"
      validationContainer.style.backgroundColor = "rgba(252, 0, 0, 0.58)"
      validationContainer.innerHTML = `<small>Something went wrong, try again!</small>`
      throw new Error(`Response status: ${response.status}`)
    } else {
      const result = response.json()
      formData.name = ""
      formData.email = ""
      formData.message = ""
      validationContainer.style.display = "block"
      validationContainer.innerHTML = `<small>Message sent! Thank you!</small>`
    }
  } catch (error) {
    console.error("Error:", error.message)
  }
  
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

// form validation
const attentionIcons = document.getElementsByClassName("icon")
