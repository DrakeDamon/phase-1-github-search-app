function fetchUserRepos(username) {
  const reposList = document.getElementById('repos-list');
  reposList.innerHTML = '';  // Clear previous repositories

  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.innerHTML = `
        <strong>${repo.name}</strong>: ${repo.description || 'No description'}
        <a href="${repo.html_url}" target="_blank">View Repo</a>
      `;
      reposList.appendChild(repoItem);
    });
  })
  .catch(error => console.error('Error fetching repositories:', error));
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('github-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchValue = document.getElementById('search').value;
    searchGitHubUsers(searchValue);
  });
});

function searchGitHubUsers(searchQuery) {
  const usersList = document.getElementById('user-list');
  usersList.innerHTML = '';  // Clear previous search results

  fetch(`https://api.github.com/search/users?q=${encodeURIComponent(searchQuery)}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => {
    data.items.forEach(user => {
      const userItem = document.createElement('li');
    userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50" height="50">
        <p>Username: <a href="${user.html_url}" target="_blank">${user.login}</a></p>
      `;
      userItem.addEventListener('click', () => fetchUserRepos(user.login));  // Fetch and display repos on click
      usersList.appendChild(userItem);
    });
  })
  .catch(error => console.error('Error fetching users:', error));
}
k