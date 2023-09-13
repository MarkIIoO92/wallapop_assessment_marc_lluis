import { ItemProps } from '../../types/ItemProps';
import { ItemService } from '../../services/ItemService';

afterEach(() => {
  jest.restoreAllMocks();
});

test('fetchItems returns the expected data', async () => {
  // Mock the fetch function
  const mockItems: ItemProps[] = [
    {
      title: 'Item 1',
      description: 'Item 1 description',
      price: 100,
      email: 'item1@example.com',
      image: 'https://example.com/item1.jpg',
    },
    {
      title: 'Item 2',
      description: 'Item 2 description',
      price: 200,
      email: 'item2@example.com',
      image: 'https://example.com/item2.jpg',
    },
  ];

  const mockResponse = {
    json: () => Promise.resolve({ items: mockItems }),
  };

  global.fetch = jest.fn(() => Promise.resolve(mockResponse as Response));

  // Call the fetchItems function
  const items = await ItemService.fetchItems();

  // Check if the items match the expected data
  expect(items).toEqual(mockItems);

  // Check if the fetch function was called with the correct URL
  expect(global.fetch).toHaveBeenCalledWith(
    'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json'
  );
});