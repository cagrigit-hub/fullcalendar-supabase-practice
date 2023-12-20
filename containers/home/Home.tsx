"use client";
import FullCalendar from "@fullcalendar/react";
import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { createClient } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import EventModal from "@/components/EventModal";
let id = 0;

function Home({ initialEvents }: { initialEvents: any }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    const title = e.currentTarget.titlex.value;
    const startTime = e.currentTarget.startTime.value;
    const endTime = e.currentTarget.endTime.value;

    const { data, error } = await supabase.from("events").insert([
      {
        title: title,
        start: selectInfo?.startStr + "T" + startTime + ":00",
        end: selectInfo?.endStr + "T" + endTime + ":00",
        allDay: selectInfo?.allDay,
      },
    ]);
    const calendarApi = selectInfo?.view.calendar;
    calendarApi?.unselect();
    if (!error) {
      calendarApi?.addEvent({
        id: String(id++),
        title: title,
        start: selectInfo?.startStr + "T" + startTime + ":00",
        end: selectInfo?.endStr + "T" + endTime + ":00",
        allDay: selectInfo?.allDay,
      });
    }
  };

  const [events, setEvents] = useState<Array<EventApi>>([]);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg>();

  useEffect(() => {
    console.log("eventler_react_kısmında", events);
  }, [events]);
  const handleEvents = async (events: EventApi[]) => {
    console.log("changeddddddd");
    setEvents(events);
  };
  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b className="mx-3"> {eventContent.timeText} </b>
        <b> {eventContent.event.title}</b>
      </>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Tıklanılan Event ${clickInfo.event.title}`);
    console.log(clickInfo.event.id);
    clickInfo.event.remove();
  };
  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    setSelectInfo(selectInfo);
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        customButtons={{
          btn: {
            text: "Buton Texti",
            click(ev: MouseEvent, element: HTMLElement) {
              alert("Özel Butona Tıklandı");
            },
          },
        }}
        dateClick={(e) => {
          console.log("dateclick", e);
        }}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        initialEvents={initialEvents}
        headerToolbar={{
          left: "prev,next today btn",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay btn",
        }}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        eventDragStart={(e) => {
          console.log("sürüklemeye başladı");
        }}
        eventDragStop={(e) => {
          console.log("sürüklemeyi bıraktı");
        }}
        // eventBackgroundColor={"blue"}
        // eventBorderColor={"purple"}
        eventRemove={(e) => {
          console.log("event silindi");
        }}
        eventsSet={handleEvents}
        /*dayHeaderFormat={{
            week:"short",
            day:"numeric",
            month:"short"
        }}*/
        eventAdd={(e) => {
          console.log("yeni event eklendi", e);
        }}
        eventChange={(e) => {
          console.log("event değişti", e);
        }}
        dayMaxEvents={true}
        weekends={true}
        locales={allLocales}
        firstDay={1}
        locale={"tr"}
        buttonText={{
          day: "Gün",
          prev: "Geri",
          nextYear: "Sonraki Yıl",
          prevYear: "Önceki Yıl",
          next: "İleri",
          month: "Ay",
          today: "Bugüne Gel",
          week: "Haftaaaa",
        }}
      />

      <EventModal onSubmit={handleSubmit} />
    </>
  );
}

export default Home;
