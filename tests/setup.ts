import '@testing-library/jest-dom/vitest';

// Mock Worker for tests
class MockWorker {
    constructor() {}
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
    onmessage = null;
    onerror = null;
}

// @ts-expect-error - Mocking Worker for tests
global.Worker = MockWorker;
