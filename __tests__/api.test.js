import { fetchData } from "@/lib/api"; // 假设这是你封装的 API 函数

jest.mock("@/lib/api"); // 模拟 API 调用

describe("fetchData", () => {
    it("should fetch data successfully", async () => {
        // 设置模拟的返回值
        fetchData.mockResolvedValue({ data: "Test Data" });

        const response = await fetchData();

        expect(response.data).toBe("Test Data");
        expect(fetchData).toHaveBeenCalledTimes(1); // 确保函数被调用了一次
    });

    it("should handle error when fetch fails", async () => {
        // 模拟网络请求失败
        fetchData.mockRejectedValue(new Error("Network Error"));

        try {
      await fetchData();
        } catch (error) {
            expect(error.message).toBe("Network Error");
        }
    });
});
