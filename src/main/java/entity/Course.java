package entity;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Course {
    private String courseId;
    private String name;
    private String teacher;
    private String site;
    private List<String> date;
    private Integer startSection;
    private Integer endSection;
    private List<Student> students;


    public Course() {
    }

    public Course(String courseId, String name, String teacher, String site, List<String> date, Integer startSection, Integer endSection, List<Student> students) {
        this.courseId = courseId;
        this.name = name;
        this.teacher = teacher;
        this.site = site;
        this.date = date;
        this.startSection = startSection;
        this.endSection = endSection;
        this.students = students;
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
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * 设置
     * @param name
     */
    public void setName(String name) {
        this.name = name;
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
     * @return site
     */
    public String getSite() {
        return site;
    }

    /**
     * 设置
     * @param site
     */
    public void setSite(String site) {
        this.site = site;
    }

    /**
     * 获取
     * @return date
     */
    public List<String> getDate() {
        return date;
    }

    /**
     * 设置
     * @param date
     */
    public void setDate(List<String> date) {
        this.date = date;
    }

    /**
     * 获取
     * @return startSection
     */
    public Integer getStartSection() {
        return startSection;
    }

    /**
     * 设置
     * @param startSection
     */
    public void setStartSection(Integer startSection) {
        this.startSection = startSection;
    }

    /**
     * 获取
     * @return endSection
     */
    public Integer getEndSection() {
        return endSection;
    }

    /**
     * 设置
     * @param endSection
     */
    public void setEndSection(Integer endSection) {
        this.endSection = endSection;
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
        return "Course{courseId = " + courseId + ", name = " + name + ", teacher = " + teacher + ", site = " + site + ", date = " + date + ", startSection = " + startSection + ", endSection = " + endSection + ", students = " + students + "}";
    }
}
