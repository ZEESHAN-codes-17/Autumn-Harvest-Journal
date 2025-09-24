
        document.querySelectorAll('.shelf-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                document.querySelectorAll('.shelf-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        // Data storage
        let tasks = [];
        let memories = [];
        let notes = [];
        let completedTaskCount = 0;

        // Task management
        function addTask() {
            const input = document.getElementById('taskInput');
            if (input.value.trim() === '') return;
            
            const task = {
                id: Date.now(),
                text: input.value,
                completed: false
            };
            
            tasks.push(task);
            input.value = '';
            renderTasks();
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task && !task.completed) {
                task.completed = true;
                completedTaskCount++;
                updateJarCount();
                animateTaskCompletion();
                renderTasks();
            }
        }

        function renderTasks() {
            const container = document.getElementById('taskList');
            if (tasks.length === 0) {
                container.innerHTML = '<div class="empty-state">🌱 Your task garden is ready for planting!</div>';
                return;
            }
            
            container.innerHTML = tasks.map(task => `
                <div class="task-item ${task.completed ? 'completed-task' : ''}">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="toggleTask(${task.id})" ${task.completed ? 'disabled' : ''}>
                    <span class="fruit-icon">🍎</span>
                    <span>${task.text}</span>
                </div>
            `).join('');
        }

        // Memory management
        function addMemory() {
            const input = document.getElementById('memoryInput');
            if (input.value.trim() === '') return;
            
            memories.push({
                id: Date.now(),
                text: input.value,
                date: new Date().toLocaleDateString()
            });
            
            input.value = '';
            renderMemories();
        }

        function renderMemories() {
            const container = document.getElementById('memoryList');
            if (memories.length === 0) {
                container.innerHTML = '<div class="empty-state">🍂 Your memory collection awaits the first harvest!</div>';
                return;
            }
            
            container.innerHTML = memories.map(memory => `
                <div class="memory-item">
                    <span class="fruit-icon">🎃</span>
                    <div>
                        <div>${memory.text}</div>
                        <small style="color: #8B4513; opacity: 0.7;">Harvested on ${memory.date}</small>
                    </div>
                </div>
            `).join('');
        }

        // Note management
        function addNote() {
            const input = document.getElementById('noteInput');
            if (input.value.trim() === '') return;
            
            notes.push({
                id: Date.now(),
                text: input.value
            });
            
            input.value = '';
            renderNotes();
        }

        function renderNotes() {
            const container = document.getElementById('noteList');
            if (notes.length === 0) {
                container.innerHTML = '<div class="empty-state">📜 Your recipe book is ready for your wisdom!</div>';
                return;
            }
            
            container.innerHTML = notes.map(note => `
                <div class="note-item">
                    <span class="fruit-icon">🏺</span>
                    <span>${note.text}</span>
                </div>
            `).join('');
        }

        // Jar animations
        function animateTaskCompletion() {
            const fallingTask = document.createElement('div');
            fallingTask.className = 'falling-task';
            fallingTask.textContent = '🍎';
            
            // Position at the completed task location
            const completedTask = document.querySelector('.task-item:not(.completed-task)');
            if (completedTask) {
                const rect = completedTask.getBoundingClientRect();
                fallingTask.style.left = rect.left + 'px';
                fallingTask.style.top = rect.top + 'px';
            } else {
                fallingTask.style.left = '50%';
                fallingTask.style.top = '50%';
            }
            
            document.body.appendChild(fallingTask);
            
            // Animate to jar position
            const jar = document.querySelector('.jar-container');
            const jarRect = jar.getBoundingClientRect();
            
            setTimeout(() => {
                fallingTask.style.left = jarRect.left + 40 + 'px';
                fallingTask.style.top = jarRect.top + 50 + 'px';
            }, 50);
            
            // Remove element after animation
            setTimeout(() => {
                document.body.removeChild(fallingTask);
            }, 1500);
            
            // Play completion sound (visual feedback)
            setTimeout(() => {
                const jar = document.querySelector('.jar');
                jar.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    jar.style.transform = 'scale(1)';
                }, 200);
            }, 1000);
        }

        function updateJarCount() {
            document.getElementById('jarCount').textContent = completedTaskCount;
        }

        // Enter key support for inputs
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        document.getElementById('memoryInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addMemory();
        });

        document.getElementById('noteInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addNote();
        });

        // Initialize with some sample data
        tasks.push(
            { id: 1, text: "Review morning harvest reports", completed: false },
            { id: 2, text: "Prepare ingredients for tonight's feast", completed: false },
            { id: 3, text: "Check the root cellar inventory", completed: false }
        );

        memories.push(
            { id: 1, text: "First successful pumpkin harvest - 47 beautiful pumpkins!", date: "Sept 15, 2025" },
            { id: 2, text: "Grandmother's apple pie recipe finally mastered", date: "Sept 20, 2025" }
        );

        notes.push(
            { id: 1, text: "Apple cider vinegar: 2 weeks fermentation yields best flavor" },
            { id: 2, text: "Plant winter squash seeds in late May for October harvest" },
            { id: 3, text: "Compost ratio: 3 parts brown to 1 part green materials" }
        );

        // Initial render
        renderTasks();
        renderMemories();
        renderNotes();
        updateJarCount();