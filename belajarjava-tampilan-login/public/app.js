const form = document.getElementById("from-box");
const messageBox = document.getElementById("message");

function setMessage(text, type = 'info') {
    messageBox.textContent = text;
    messageBox.className = type;
    messageBox.classList.add('message',type);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    setMessage("Memproses...", 'info');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {

            setMessage(result.message, 'success');
            localStorage.setItem("loggedIn","true");

            setTimeout(() => {
            window.location.href = data.redirect || "dashboard.html";
        }, 1000);
        
        } else {
            setMessage(result.message, 'error');

            const passField = form.querySelector('input[type="password"]');
            if (passField) passField.value = "";

            passField.focus();
        }
        

        
    } catch (error) {
        setMessage("Terjadi kesalahan. Silakan coba lagi.", 'error');
    }
});