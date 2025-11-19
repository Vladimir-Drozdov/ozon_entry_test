class ProgressBlock {
    constructor(root, options = {}) {
        this.root = root;
        this.value = options.value ?? 0;
        this.animated = options.animated ?? false;
        this.hidden = options.hidden ?? false;
        this.render();
        this.setupCircle();
        this.updateProgress();
    }

    render() {
        this.root.innerHTML = `
            <div class="progress">
                <div class="progress__circle-wrapper">
                    <svg class="progress__circle" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                        <circle class="progress__circle-bg" cx="50%" cy="50%" r="47%" stroke-width="6%" fill="none"></circle>
                        <circle class="progress__circle-bar" cx="50%" cy="50%" r="47%" stroke-width="6%" fill="none" stroke-linecap="butt"></circle>
                    </svg>
                    <div class="progress__value-display"></div>
                </div>
                <div class="progress__controlers-wrapper">
                    <div class="progress__controlers">
                        <label class="progress__controler">
                            <input type="number" class="progress__input" min="0" max="100">
                            <span class="progress__label">Value</span>
                        </label>
                        <label class="progress__controler">
                            <span class="progress__toggle">
                                <input type="checkbox" class="progress__toggle-checkbox progress__toggle-animate">
                                <span class="progress__toggle-slider"></span>
                            </span>
                            <span class="progress__label">Animate</span>
                        </label>
                        <label class="progress__controler">
                            <span class="progress__toggle">
                                <input type="checkbox" class="progress__toggle-checkbox progress__toggle-hide">
                                <span class="progress__toggle-slider"></span>
                            </span>
                            <span class="progress__label">Hide</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        this.progressBar = this.root.querySelector('.progress__circle-bar');
        this.progressValueDisplay = this.root.querySelector('.progress__value-display');
        this.input = this.root.querySelector('.progress__input');
        this.animateToggle = this.root.querySelector('.progress__toggle-animate');
        this.progressCircle = this.root.querySelector('.progress__circle');
        this.hideToggle = this.root.querySelector('.progress__toggle-hide');
        this.circleWrapper = this.root.querySelector('.progress__circle-wrapper');
        this.setupControls();
    }

    setupControls() {
        this.input.addEventListener('input', () => {
            this.setValue(this.input.value);
        });

        this.animateToggle.addEventListener('change', () => {
            this.setAnimated(this.animateToggle.checked);
        });

        this.hideToggle.addEventListener('change', () => {
            this.setHidden(this.hideToggle.checked);
        });
    }

    setupCircle() {
        this.radius = this.progressBar.r.baseVal.value;
        this.perimeter = 2 * Math.PI * this.radius;

        this.progressBar.style.transition = 'none';
        this.progressBar.style.strokeDasharray = this.perimeter;
        this.progressBar.style.strokeDashoffset = this.perimeter;

        requestAnimationFrame(() => {
            this.progressBar.style.transition = 'stroke-dashoffset 0.4s linear';
        });
    }

    setValue(v) {
        this.value = Math.max(0, Math.min(100, v));
        this.updateProgress();
    }

    setAnimated(a) {
        this.animated = a;
        this.updateProgress();
    }

    setHidden(h) {
        this.hidden = h;
        this.updateProgress();
    }

    updateProgress() {
        const offset = this.perimeter * (1 - this.value / 100);
        this.progressBar.style.strokeDashoffset = offset;            
        this.progressValueDisplay.textContent = this.value + '%';
        this.progressCircle.classList.toggle('progress__circle--animated', this.animated);
        this.circleWrapper.classList.toggle('progress__circle-wrapper--hide-circle', this.hidden);
        this.input.value = this.value;
        this.animateToggle.checked = this.animated;
        this.hideToggle.checked = this.hidden;
    }
}
