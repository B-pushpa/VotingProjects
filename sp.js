document.addEventListener('DOMContentLoaded', () => {
    const voteButtons = document.querySelectorAll('.vote-button');
    const resultDiv = document.getElementById('result');
    const votesDiv = document.getElementById('votes');
    const votes = JSON.parse(localStorage.getItem('votes')) || { option1: 0, option2: 0, option3: 0 };
    const voted = localStorage.getItem('voted');
    
    function updateVotesDisplay() {
        votesDiv.innerHTML = `
            <p>Option 1: ${votes.option1} votes</p>
            <p>Option 2: ${votes.option2} votes</p>
            <p>Option 3: ${votes.option3} votes</p>
        `;
    }

    function showResult(option) {
        resultDiv.textContent = `You voted for ${option}`;
        resultDiv.style.color = "green";
    }

    if (voted) {
        voteButtons.forEach(button => button.disabled = true);
        showResult(voted);
    }

    updateVotesDisplay();

    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const option = button.getAttribute('data-option');
            votes[option]++;
            localStorage.setItem('votes', JSON.stringify(votes));
            localStorage.setItem('voted', option);
            voteButtons.forEach(btn => btn.disabled = true);
            showResult(option);
            updateVotesDisplay();
        });
    });
});