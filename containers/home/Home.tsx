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

import { useContext, useEffect, useState } from "react";
import EventModal from "@/components/EventModal";
import { AuthContext } from "@/app/layout";
import { useRouter, useParams } from "next/navigation";
import supabase from "@/supabase";

let id = 0;

export const dynamic = "auto";

function Home({ initialEvents }: { initialEvents: any }) {
  const session = useContext(AuthContext);
  const params = useParams();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = e.currentTarget.titlex.value;
    const startTime = e.currentTarget.startTime.value;
    const endTime = e.currentTarget.endTime.value;

    const { data, error } = await supabase.from("events").insert([
      {
        from: session?.user?.id,
        to: params.userId,
        title: title,
        start: selectInfo?.startStr + "T" + startTime + ":00",
        end: selectInfo?.endStr + "T" + endTime + ":00",
        allDay: selectInfo?.allDay,
      },
    ]);
    const calendarApi = selectInfo?.view.calendar;
    if (!error) {
      calendarApi?.addEvent({
        id: String(id++),
        title: title,
        start: selectInfo?.startStr + "T" + startTime + ":00",
        end: selectInfo?.endStr + "T" + endTime + ":00",
        allDay: false,
      });
      setIsModalOpen(false);
      setSelectInfo(undefined);
      calendarApi?.unselect();
    }
  };

  const [events, setEvents] = useState<Array<EventApi>>([]);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("eventler_react_kisminda", events);
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
    const c = clickInfo.event.extendedProps;
    const is = c.extendendProps.onlyClickableByOwner;
    if (is) {
      return;
    }
    alert(`Tiklanilan Event ${clickInfo.event.title}`);
    console.log(clickInfo.event.id);
    // clickInfo.event.remove();
  };

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    console.log(selectInfo);
    setSelectInfo(selectInfo);
    setIsModalOpen(true);
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        selectOverlap={function (event: any) {
          return event.rendering === "background";
        }}
        customButtons={{
          btn: {
            text: "Sign out",
            async click(ev: MouseEvent, element: HTMLElement) {
              ev.preventDefault();
              // sign out
              await supabase.auth.signOut();
              // redirect to home
              router.refresh();
            },
          },
        }}
        dateClick={(e) => {
          // log if event is background
          // @ts-ignore
          if (e.jsEvent.target?.classList.contains("fc-bg-event")) {
            console.log("sdasd", e);
          }
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
        // dayMaxEvents={true}
        weekends={true}
        locales={allLocales}
        // firstDay={1}
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
      {isModalOpen && <EventModal onSubmit={handleSubmit} />}
    </>
  );
}

export default Home;
