// Admin dashboard functionality

// After authentication, list all uploaded files from all users
firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    alert('로그인이 필요합니다.');
    window.location.href = 'login.html';
    return;
  }
  try {
    await listAllFiles();
  } catch (err) {
    console.error(err);
    alert('파일 목록을 불러오는데 실패했습니다.');
  }
});

async function listAllFiles() {
  const storageRef = firebase.storage().ref('uploads');
  const result = await storageRef.listAll();
  const container = document.getElementById('allFiles');
  container.innerHTML = '';

  for (const userFolder of result.prefixes) {
    const userFiles = await userFolder.listAll();
    for (const itemRef of userFiles.items) {
      const url = await itemRef.getDownloadURL();
      const li = document.createElement('li');
      li.innerHTML = `<a href="${url}" target="_blank">${userFolder.name}/${itemRef.name}</a>`;
      container.appendChild(li);
    }
  }
}
