package entity;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QRCodeResult {
    private String courseName;
    private String courseId;
    private String date;
    private String teacher;
    private List<Student> students;

    public QRCodeResult() {
    }

    public QRCodeResult(String courseName, String courseId, String date, String teacher, List<Student> students) {
        this.courseName = courseName;
        this.courseId = courseId;
        this.date = date;
        this.teacher = teacher;
        this.students = students;
    }

    /**
     * 获取
     * @return courseName
     */
    public String getCourseName() {
        return courseName;
    }

    /**
     * 设置
     * @param courseName
     */
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    /**
     * 获取
     * @return courseId
     */
    public String getCourseId() {
        return courseId;
    }

    /**
     * 设置
     * @param courseId
     */
    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    /**
     * 获取
     * @return date
     */
    public String getDate() {
        return date;
    }

    /**
     * 设置
     * @param date
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * 获取
     * @return teacher
     */
    public String getTeacher() {
        return teacher;
    }

    /**
     * 设置
     * @param teacher
     */
    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    /**
     * 获取
     * @return students
     */
    public List<Student> getStudents() {
        return students;
    }

    /**
     * 设置
     * @param students
     */
    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public String toString() {
        return "QRCodeResult{courseName = " + courseName + ", courseId = " + courseId + ", date = " + date + ", teacher = " + teacher + ", students = " + students + "}";
    }
}
