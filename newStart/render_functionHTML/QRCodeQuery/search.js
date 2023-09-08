const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  fetch(`https://api.example.com/search?query=${query}`)
    .then(response => response.json())
    .then(data => {
      // 清空之前的结果
      resultsDiv.innerHTML = '';

      // 展示查询结果
      data.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.textContent = result.name; // 假设查询结果中有名字字段
        resultsDiv.appendChild(resultItem);
      });
    })
    .catch(error => {
      console.error('查询错误:', error);
    });
});