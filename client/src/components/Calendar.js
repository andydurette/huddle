import React from 'react';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-react-schedule";

function Calendar() {
    return (
        <section id="wrapper" className="Calendar">
            <div id="wrapper-contents" >
                <ScheduleComponent>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
            </div>
        </section>

    )
}

export default Calendar;