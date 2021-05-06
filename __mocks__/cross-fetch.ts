// TODO: Figure out if there is a workaround to jest only allowing inline functions for mockImplementation()
const mockFetch: jest.Mock<Promise<Partial<Response>>> = jest.genMockFromModule(
  'cross-fetch'
);

export default mockFetch;
