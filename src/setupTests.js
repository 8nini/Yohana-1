import '@testing-library/jest-dom';

// Mock IntersectionObserver for framer-motion
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock FileReader for jsdom environment to allow file upload simulation
global.FileReader = class {
  constructor() {
    this.onload = null;
    this.result = 'data:image/png;base64,mock-file-content';
  }
  readAsDataURL(file) {
    // When readAsDataURL is called, we immediately call onload to simulate the read.
    if (this.onload) {
      this.onload({ target: { result: this.result } });
    }
  }
};

// Mock alert to prevent test crashes
vi.stubGlobal('alert', vi.fn());