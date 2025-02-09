import React, { useState, useEffect } from "react";
import { LuMoveRight } from "react-icons/lu";
import { toast } from "react-toastify";
const Content = ({
  lesson,
  completeLesson,
  handleUndo,
  userCourseData,
  lessons,
  setSelectLesson,
  setActiveIndex,
  logout,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showUndo, setShowUndo] = useState(false);

  // Check completion status when `lesson` or `userCourseData` changes
  useEffect(() => {
    if (lesson && lesson.id && userCourseData?.completedLessons) {
      const completed = userCourseData.completedLessons.includes(lesson.id);
      setIsCompleted(completed);
      setShowUndo(completed);
    }
  }, [lesson, userCourseData]);

  const handleMarkAsComplete = () => {
    if (!lesson || !lesson.id) return;
    completeLesson(lesson.id);
    setIsCompleted(true);
    setShowUndo(true);
  };

  const handleUndoClick = () => {
    if (!lesson || !lesson.id) return;
    handleUndo(lesson.id);
    setIsCompleted(false);
    setShowUndo(false);
  };
  const handleGoNext = () => {
    if (!lesson || !lessons || lessons.length === 0) return;
    const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (currentIndex === -1) return;
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      setSelectLesson(nextLesson); // Update the selected lesson
      setActiveIndex(currentIndex + 1); // Update the active index
    } else {
      toast.warn("You have reached the last lesson.");
    }
  };
  return (
    <div className="flex flex-col w-full h-[750px]">
      <div className="bg-bgSecondary h-screen max-h-auto rounded-2xl p-5">
        <h1 className="text-white font-Inter text-[32px] font-bold">
          {lesson ? lesson.question : "Select a Lesson"}
        </h1>
        <p className="text-white font-Inter text-[20px] font-medium leading-9 mt-5">
          {lesson ? lesson.answer : "Please select a lesson from the sidebar."}
        </p>
      </div>
      {/* Buttons Section */}
      <div className="flex justify-between items-center mt-5">
        <div>
          {/* Show "Mark As Complete" when lesson is NOT completed */}
          {!isCompleted ? (
            <button
              onClick={handleMarkAsComplete}
              className="cursor-pointer border-2 border-buttonColor text-buttonColor py-3 px-6 sm:px-8 rounded-3xl font-Inter font-semibold">
              Mark As Complete
            </button>
          ) : (
            <>
              {/* Show "Completed" button when lesson is completed */}
              <button className="cursor-pointer bg-buttonColor text-bgPrimary py-3 px-6 sm:px-8 rounded-3xl font-Inter font-semibold">
                Completed
              </button>

              {/* Show "Undo" button when lesson is completed */}
              {showUndo && (
                <button
                  onClick={handleUndoClick}
                  className="ml-3 underline cursor-pointer text-buttonColor py-3 px-6 sm:px-8 rounded-3xl font-Inter font-semibold">
                  Undo
                </button>
              )}
            </>
          )}
        </div>
        <button onClick={logout} className="text-buttonColor cursor-pointer">
          Log Out
        </button>
        {/* Next Button */}
        <button
          onClick={handleGoNext}
          className="flex justify-center items-center cursor-pointer text-buttonColor py-3 px-6 sm:px-8 rounded-3xl font-Inter font-semibold">
          Go Next <LuMoveRight className="ml-2 mt-[1px]" size={30} />
        </button>
      </div>
    </div>
  );
};

export default Content;
