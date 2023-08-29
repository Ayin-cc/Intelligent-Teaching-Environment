package service;

import dao.CallStuDao;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class CallStuServiceImpl implements CallStuService {
    @Autowired
    private CallStuDao callStuDao;

    @Override
    public List<Student> random(String token, int count, String uid){
        if(callStuDao.checkToken(token) == 1){
            // 从已经签到的学生中随机抽取n位
            List<Student> students = callStuDao.selectStudentByUid(uid);
            List<Student> result = new ArrayList<>();
            Random r = new Random();
            for(int i = 0; i < count; i++){
                int num = r.nextInt(students.size() - 1);
                result.add(students.get(num));
                students.remove(num);
            }
            return result;
        }
        return null;
    }

    @Override
    public boolean select(String token, String id, String sid){
        if(callStuDao.checkToken(token) == 1){
            // 将点到的学生存入数据库
            LocalDate date = LocalDate.now();
            LocalTime time = LocalTime.now();
            String dateStr = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String timeStr = time.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            callStuDao.addCallStudent(id, dateStr, timeStr, sid);
            return true;
        }
        return false;
    }
}
