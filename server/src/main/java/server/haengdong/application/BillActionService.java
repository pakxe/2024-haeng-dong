package server.haengdong.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.haengdong.application.request.BillActionAppRequest;
import server.haengdong.domain.action.Action;
import server.haengdong.domain.action.BillAction;
import server.haengdong.domain.event.Event;
import server.haengdong.domain.action.ActionRepository;
import server.haengdong.domain.action.BillActionRepository;
import server.haengdong.domain.event.EventRepository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BillActionService {

    private final BillActionRepository billActionRepository;
    private final ActionRepository actionRepository;
    private final EventRepository eventRepository;

    @Transactional
    public void saveAllBillAction(String eventToken, List<BillActionAppRequest> requests) {
        Event event = eventRepository.findByToken(eventToken)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이벤트 토큰입니다."));
        Action action = createStartAction(event);

        for (BillActionAppRequest request : requests) {
            BillAction billAction = request.toBillAction(action);
            billActionRepository.save(billAction);
            action = action.next();
        }
    }

    private Action createStartAction(Event event) {
        return actionRepository.findLastByEvent(event)
                .map(Action::next)
                .orElse(Action.createFirst(event));
    }
}