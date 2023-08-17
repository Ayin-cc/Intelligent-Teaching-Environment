package serve;

import dao.CallStuDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CallStuServiceImpl implements CallStuService {
    @Autowired
    private CallStuDao callStuDao;

    @Override
    public void random(){

    }

    @Override
    public void select(){

    }
}
