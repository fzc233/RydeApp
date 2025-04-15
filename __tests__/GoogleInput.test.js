import { render, fireEvent } from "@testing-library/react-native";
import GoogleTextInput from "@/components/GoogleTextInput"; // 组件的路径

const mockHandlePress = jest.fn(); // 模拟 handlePress 函数

describe("GoogleTextInput", () => {
  it("should call handlePress when a location is selected", () => {
    const { getByPlaceholderText, getByText } = render(
      <GoogleTextInput
        icon={null}
        initialLocation="Current Location"
        containerStyle="bg-white"
        textInputBackgroundColor="white"
        handlePress={mockHandlePress}
      />,
    );

    // 模拟用户输入
    const input = getByPlaceholderText("Search");
    fireEvent.changeText(input, "New Location");

    // 模拟点击选中位置
    const button = getByText("Search"); // 假设有按钮触发搜索
    fireEvent.press(button);

    // 确保 handlePress 被调用
    expect(mockHandlePress).toHaveBeenCalledWith({
      latitude: 10.0, // 假设从 API 得到的经度
      longitude: 20.0, // 假设从 API 得到的纬度
      address: "New Location",
    });
  });
});
