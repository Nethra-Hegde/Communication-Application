document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedin"));
  if (!user) return window.location.href = "login.html";

  const uploadForm = document.getElementById("uploadForm");
  const uploadTable = document.getElementById("uploadTable");

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const label = document.getElementById("uploadLabel").value.trim();
    const file = document.getElementById("uploadFile").files[0];
    if (!label || !file) return alert("All fields are required");

    const formData = new FormData();
    formData.append("label", label);
    formData.append("file", file);
    formData.append("uploadedBy", user.email);

    const res = await fetch("http://localhost:5000/api/documents/upload", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Upload failed: " + err.message);
    } else {
      alert("Upload successful!");
      uploadForm.reset();
      bootstrap.Modal.getInstance(document.getElementById("uploadModal")).hide();
      renderUploads();
    }
  });

  async function renderUploads() {
    const res = await fetch("http://localhost:5000/api/documents");
    const docs = await res.json();

    uploadTable.innerHTML = "";
    docs.forEach((doc, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${doc.label}</td>
        <td><a href="/uploads/${doc.fileName}" target="_blank">${doc.fileName}</a></td>
        <td>${doc.uploadedBy}</td>
      `;
      uploadTable.appendChild(row);
    });
  }

  renderUploads();
});
