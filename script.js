const menuIcon = document.querySelector("#menu")
const navLinks = document.querySelector(".navLinks")

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let fName = document.getElementById("fname")
  let fEmail = document.getElementById("email")
  let fMessage = document.getElementById("message")

  let formData = {
    name: fName.value,
    email: fEmail.value,
    message: fMessage.value,
  }

  async function postForm() {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
        alert("something went wrong!")
      }

      const result = await response.json()
      alert("message sent!")
      formData.name = ""
      formData.email = ""
      formData.message = ""
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  postForm()
})
