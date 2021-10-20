import { formatDate } from "../date";

describe('formatDate', () => {
    it('chek format', () => {
        expect(formatDate(1577014368252, 'yyyy')).toBe('2019');
    })
})