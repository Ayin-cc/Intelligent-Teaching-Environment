import javax.swing.*;

public class MsgDistr {
    public static void main(String[] args) {
        // 创建 JFrame 实例
        JFrame frame = new JFrame("消息分发");
        // 设置窗口大小
        frame.setSize(800, 600);
        // 设置默认关闭操作
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        // 设置布局管理器，使用绝对布局
        frame.setLayout(null);
        JPanel panel = new JPanel();

        // 创建组件
        JRadioButton option1 = new JRadioButton("一般通知");
        JRadioButton option2 = new JRadioButton("重要通知");
        JRadioButton option3 = new JRadioButton("宣传");
        JButton bt1 = new JButton("发送");
        JButton bt2 = new JButton("清空");
        JButton bt3 = new JButton("发送历史");
        JButton bt4 = new JButton("退出");
        JLabel label = new JLabel("标题");
        JTextPane jtp = new JTextPane();
        JScrollPane text = new JScrollPane(jtp);
        JTextField title = new JTextField();

        // 调整组件大小和位置
        bt1.setBounds(585, 250, 100, 30);
        bt2.setBounds(585, 290, 100, 30);
        bt3.setBounds(585, 330, 100, 30);
        bt4.setBounds(585, 370, 100, 30);
        title.setBounds(50, 20, 470, 20);
        text.setBounds(20, 50, 500, 460);
        label.setBounds(20, 18, 30, 20);

        // 将单选框添加到 ButtonGroup 中，以便只能选择其中一个
        ButtonGroup group = new ButtonGroup();
        group.add(option1);
        group.add(option2);
        group.add(option3);

        // 将单选框添加到面板中
        panel.add(option1);
        panel.add(option2);
        panel.add(option3);
        panel.setBounds(600, 100, 80, 90);

        // 添加到窗口中
        frame.add(panel);
        frame.add(bt1);
        frame.add(bt2);
        frame.add(bt3);
        frame.add(bt4);
        frame.add(title);
        frame.add(text);
        frame.add(label);

        // 设置窗口可见
        frame.setVisible(true);
    }
}