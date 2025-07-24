async function fetchAllFiles() {
  const listRef = firebase.storage().ref('uploads');
  const allFiles = document.getElementById('allFiles');
  allFiles.innerHTML = '';

  const result = await listRef.listAll();
  for (const userFolder of result.prefixes) {
    const userFiles = await userFolder.listAll();
    for (const itemRef of userFiles.items) {
      const url = await itemRef.getDownloadURL();
      const li = document.createElement('li');
      li.innerHTML = `<a href="${url}" target="_blank">${itemRef.fullPath}</a>`;
      allFiles.appendChild(li);
    }
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    alert('로그인이 필요합니다.');
    window.location.href = 'login.html';
  } else {
    fetchAllFiles();
  }
});

