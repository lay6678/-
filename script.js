document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.text-input');
    
    inputs.forEach(input => {
        // 保存初始值
        input.dataset.initialValue = input.value;

        // 处理失去焦点
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.value = this.dataset.initialValue;
            }
            saveToLocalStorage();
        });

        // 处理按回车
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    });

    // 保存到本地存储
    function saveToLocalStorage() {
        const data = {};
        inputs.forEach((input, index) => {
            data[index] = input.value;
        });
        localStorage.setItem('mandalaData', JSON.stringify(data));
    }

    // 从本地存储加载
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('mandalaData');
        if (savedData) {
            const data = JSON.parse(savedData);
            inputs.forEach((input, index) => {
                if (data[index]) {
                    input.value = data[index];
                }
            });
        }
    }

    // 加载保存的数据
    loadFromLocalStorage();

    // 获取元素
    const introBtn = document.getElementById('introBtn');
    const saveBtn = document.getElementById('saveBtn');
    const contactBtn = document.getElementById('contactBtn');
    const introModal = document.getElementById('introModal');
    const contactModal = document.getElementById('contactModal');
    const closeBtns = document.getElementsByClassName('close');

    // 简介按钮点击事件
    introBtn.onclick = function() {
        introModal.style.display = "block";
    }

    // 保存按钮点击事件
    saveBtn.onclick = function() {
        // 获取所有输入框的值
        const inputs = document.querySelectorAll('.text-input');
        const data = {};
        inputs.forEach((input, index) => {
            data[index] = input.value;
        });

        // 创建下载文件
        const content = JSON.stringify(data, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = '曼陀罗计划表_' + new Date().toLocaleDateString() + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 联系作者按钮点击事件
    contactBtn.onclick = function() {
        contactModal.style.display = "block";
    }

    // 关闭按钮事件
    Array.from(closeBtns).forEach(btn => {
        btn.onclick = function() {
            introModal.style.display = "none";
            contactModal.style.display = "none";
        }
    });

    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target == introModal) {
            introModal.style.display = "none";
        }
        if (event.target == contactModal) {
            contactModal.style.display = "none";
        }
    }

    // 处理联系表单提交
    document.getElementById('contactForm').onsubmit = function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 这里可以添加发送邮件的逻辑
        alert('感谢您的留言！我们会尽快回复。');
        contactModal.style.display = "none";
        this.reset();
    }
});