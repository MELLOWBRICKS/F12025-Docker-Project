// F1 Fan App - Enhanced Interactive JavaScript with F1.com styling
class F1FanApp {
    constructor() {
        this.drivers = [];
        this.currentPage = 'drivers';
        this.hasVoted = this.checkVotingStatus();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDrivers();
        this.showPage('drivers');
        this.addParallaxEffect();
        
        // Auto-refresh results every 30 seconds when on results page
        setInterval(() => {
            if (this.currentPage === 'results') {
                this.loadResults();
            }
        }, 30000);
    }

    setupEventListeners() {
        // Navigation buttons with enhanced animations
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.target.closest('.nav-btn').dataset.page;
                this.showPage(page);
                
                // Add click animation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            });
        });

        // Handle vote submissions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.vote-card')) {
                const voteCard = e.target.closest('.vote-card');
                const driverId = voteCard.dataset.driverId;
                this.submitVote(driverId);
            }
        });

        // Add smooth scroll behavior
        document.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > 50) {
                e.preventDefault();
                window.scrollBy({
                    top: e.deltaY * 0.5,
                    behavior: 'smooth'
                });
            }
        }, { passive: false });
    }

    addParallaxEffect() {
        // Add subtle parallax effect to cards
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.driver-card, .vote-card, .result-bar');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                
                const distanceX = (e.clientX - cardCenterX) / window.innerWidth;
                const distanceY = (e.clientY - cardCenterY) / window.innerHeight;
                
                if (Math.abs(distanceX) < 0.3 && Math.abs(distanceY) < 0.3) {
                    const rotateX = distanceY * 5;
                    const rotateY = distanceX * -5;
                    const translateZ = 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                }
            });
        });
    }

    showPage(pageName) {
        // Enhanced page transition
        const currentPage = document.querySelector('.page.active');
        const targetPage = document.getElementById(`${pageName}-page`);
        
        if (currentPage) {
            currentPage.style.opacity = '0';
            currentPage.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                currentPage.classList.remove('active');
                targetPage.classList.add('active');
                targetPage.style.opacity = '0';
                targetPage.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                }, 50);
            }, 200);
        } else {
            targetPage.classList.add('active');
        }

        // Update navigation with smooth transition
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(1)';
        });
        
        const activeBtn = document.querySelector(`[data-page="${pageName}"]`);
        activeBtn.classList.add('active');
        activeBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            activeBtn.style.transform = '';
        }, 300);

        this.currentPage = pageName;

        // Load page-specific data
        switch (pageName) {
            case 'drivers':
                this.loadDrivers();
                break;
            case 'vote':
                this.loadVotingPage();
                break;
            case 'results':
                this.loadResults();
                break;
        }
    }

    async loadDrivers() {
        this.showLoading(true);
        
        try {
            const response = await fetch('/api/drivers');
            const data = await response.json();
            
            if (data.success) {
                this.drivers = data.data;
                this.renderDrivers();
            } else {
                this.showToast('Failed to load drivers', 'error');
            }
        } catch (error) {
            console.error('Error loading drivers:', error);
            this.showToast('Network error loading drivers', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    renderDrivers() {
        const grid = document.getElementById('drivers-grid');
        grid.innerHTML = '';

        this.drivers.forEach((driver, index) => {
            const card = document.createElement('div');
            card.className = 'driver-card glass-effect';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="driver-image">
                    <img src="${driver.imageUrl}" alt="${driver.name}" 
                         onerror="this.src='https://via.placeholder.com/300x300/e50000/ffffff?text=${driver.name.split(' ').map(n => n[0]).join('')}'">
                    <div class="driver-number">#${driver.number}</div>
                </div>
                <h3 class="driver-name">${driver.name}</h3>
                <p class="driver-team">${driver.team}</p>
                <p class="driver-country">🏁 ${driver.country}</p>
            `;
            
            // Add stagger animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
            
            grid.appendChild(card);
        });
    }

    async loadVotingPage() {
        if (this.drivers.length === 0) {
            await this.loadDrivers();
        }
        
        this.renderVotingOptions();
        this.updateVoteStatus();
    }

    renderVotingOptions() {
        const grid = document.getElementById('vote-grid');
        grid.innerHTML = '';

        this.drivers.forEach((driver, index) => {
            const card = document.createElement('div');
            card.className = `vote-card glass-effect ${this.hasVoted ? 'disabled' : ''}`;
            card.dataset.driverId = driver.id;
            card.style.animationDelay = `${index * 0.05}s`;
            
            card.innerHTML = `
                <div class="vote-image">
                    <img src="${driver.imageUrl}" alt="${driver.name}"
                         onerror="this.src='https://via.placeholder.com/300x300/e50000/ffffff?text=${driver.name.split(' ').map(n => n[0]).join('')}'">
                    <div class="driver-number-small">#${driver.number}</div>
                </div>
                <h4 class="vote-name">${driver.name}</h4>
                <p class="vote-team">${driver.team}</p>
                <p class="vote-country">${driver.country}</p>
            `;
            
            if (!this.hasVoted) {
                card.style.cursor = 'pointer';
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            } else {
                card.style.opacity = '0.6';
                card.style.cursor = 'not-allowed';
            }
            
            // Add stagger animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = this.hasVoted ? '0.6' : '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
            
            grid.appendChild(card);
        });
    }

    updateVoteStatus() {
        const statusDiv = document.getElementById('vote-status');
        
        if (this.hasVoted) {
            statusDiv.innerHTML = `
                <div class="vote-status success">
                    <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem; color: #e50000; filter: drop-shadow(0 0 10px rgba(229, 0, 0, 0.5));"></i>
                    <h3 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Vote Submitted!</h3>
                    <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: rgba(255, 255, 255, 0.8);">Thank you for voting! You can view the live results to see how the F1 community is voting.</p>
                    <button onclick="app.showPage('results')" style="
                        background: linear-gradient(135deg, #e50000, #ff3333);
                        border: none;
                        color: white;
                        padding: 16px 32px;
                        border-radius: 50px;
                        cursor: pointer;
                        margin-top: 1rem;
                        font-weight: 700;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 25px rgba(229, 0, 0, 0.4);
                    " onmouseover="this.style.transform='translateY(-2px) scale(1.05)'; this.style.boxShadow='0 12px 35px rgba(229, 0, 0, 0.6)'" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 8px 25px rgba(229, 0, 0, 0.4)'">
                        <i class="fas fa-chart-bar" style="margin-right: 8px;"></i>
                        View Live Results
                    </button>
                </div>
            `;
        } else {
            statusDiv.innerHTML = `
                <div class="vote-status">
                    <i class="fas fa-vote-yea" style="font-size: 3rem; margin-bottom: 1rem; color: #e50000; filter: drop-shadow(0 0 10px rgba(229, 0, 0, 0.5));"></i>
                    <h3 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">Cast Your Vote</h3>
                    <p style="font-size: 1.1rem; color: rgba(255, 255, 255, 0.8);">Click on a driver above to vote for who you think will win the next Grand Prix!</p>
                </div>
            `;
        }
    }

    async submitVote(driverId) {
        if (this.hasVoted) {
            this.showToast('You have already voted for this Grand Prix!', 'error');
            return;
        }

        this.showLoading(true);

        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ driverId: parseInt(driverId) })
            });

            const data = await response.json();

            if (data.success) {
                this.hasVoted = true;
                this.showToast(`🏁 Vote recorded for ${data.data.driverName}!`, 'success');
                this.updateVoteStatus();
                this.renderVotingOptions();
                
                // Add celebration animation
                const votedCard = document.querySelector(`[data-driver-id="${driverId}"]`);
                if (votedCard) {
                    votedCard.classList.add('voted');
                    votedCard.style.transform = 'scale(1.1) rotateY(360deg)';
                    votedCard.style.background = 'rgba(229, 0, 0, 0.2)';
                    votedCard.style.borderColor = '#e50000';
                    votedCard.style.boxShadow = '0 0 40px rgba(229, 0, 0, 0.5)';
                    
                    setTimeout(() => {
                        votedCard.style.transform = 'scale(1)';
                    }, 600);
                }
            } else {
                this.showToast(data.message || 'Failed to submit vote', 'error');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            this.showToast('Network error submitting vote', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async loadResults() {
        this.showLoading(true);

        try {
            const response = await fetch('/api/results');
            const data = await response.json();

            if (data.success) {
                this.renderResults(data.data);
            } else {
                this.showToast('Failed to load results', 'error');
            }
        } catch (error) {
            console.error('Error loading results:', error);
            this.showToast('Network error loading results', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    renderResults(data) {
        const { results, totalVotes, lastUpdated } = data;
        
        // Update summary with animation
        const totalVotesEl = document.getElementById('total-votes');
        const currentCount = parseInt(totalVotesEl.textContent) || 0;
        this.animateNumber(totalVotesEl, currentCount, totalVotes, 1000);
        
        document.getElementById('last-updated').textContent = 
            new Date(lastUpdated).toLocaleTimeString();

        // Render chart
        const chart = document.getElementById('results-chart');
        chart.innerHTML = '';

        const maxVotes = Math.max(...results.map(r => r.votes), 1);

        results.forEach((result, index) => {
            const percentage = totalVotes > 0 ? (result.votes / totalVotes * 100) : 0;
            const barWidth = totalVotes > 0 ? (result.votes / maxVotes * 100) : 0;
            
            const bar = document.createElement('div');
            bar.className = 'result-bar glass-effect';
            bar.style.animationDelay = `${index * 0.1}s`;
            
            bar.innerHTML = `
                <div class="result-info">
                    <div class="result-driver">
                        <div class="result-avatar">
                            <img src="${this.getDriverImage(result.id)}" alt="${result.name}"
                                 onerror="this.src='https://via.placeholder.com/300x300/e50000/ffffff?text=${result.name.split(' ').map(n => n[0]).join('')}'">
                        </div>
                        <div class="result-details">
                            <h4>${result.name}</h4>
                            <p>${result.team}</p>
                        </div>
                    </div>
                    <div class="result-votes">
                        ${result.votes} votes (${percentage.toFixed(1)}%)
                    </div>
                </div>
                <div class="result-progress">
                    <div class="result-progress-fill" style="width: 0%"></div>
                </div>
            `;
            
            chart.appendChild(bar);
            
            // Animate progress bar
            setTimeout(() => {
                const progressFill = bar.querySelector('.result-progress-fill');
                progressFill.style.width = `${barWidth}%`;
            }, index * 100 + 200);
        });

        // Add podium effects for top 3
        setTimeout(() => {
            const bars = chart.querySelectorAll('.result-bar');
            bars.forEach((bar, index) => {
                if (index === 0) {
                    bar.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05))';
                    bar.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                    bar.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.2)';
                } else if (index === 1) {
                    bar.style.background = 'linear-gradient(135deg, rgba(192, 192, 192, 0.15), rgba(192, 192, 192, 0.05))';
                    bar.style.borderColor = 'rgba(192, 192, 192, 0.3)';
                } else if (index === 2) {
                    bar.style.background = 'linear-gradient(135deg, rgba(205, 127, 50, 0.15), rgba(205, 127, 50, 0.05))';
                    bar.style.borderColor = 'rgba(205, 127, 50, 0.3)';
                }
            });
        }, 1000);
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    getDriverImage(driverId) {
        const driver = this.drivers.find(d => d.id === driverId);
        return driver ? driver.imageUrl : 'https://via.placeholder.com/300x300/e50000/ffffff?text=F1';
    }

    checkVotingStatus() {
        return document.cookie.includes('hasVoted=true');
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.classList.add('show');
        } else {
            loading.classList.remove('show');
        }
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast glass-effect-strong ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new F1FanApp();
});

// Add keyboard navigation with F1 theme
document.addEventListener('keydown', (e) => {
    if (e.key === '1') window.app.showPage('drivers');
    if (e.key === '2') window.app.showPage('vote');
    if (e.key === '3') window.app.showPage('results');
    if (e.key === 'r' || e.key === 'R') {
        if (window.app.currentPage === 'results') {
            window.app.loadResults();
        }
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';
