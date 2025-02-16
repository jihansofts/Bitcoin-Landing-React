import React, { useState, useEffect } from "react";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
const Content = ({
  lesson,
  completeLesson,
  handleUndo,
  userCourseData,
  lessons,
  setSelectLesson,
  setActiveIndex,
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
    }
  };
  const handleGoPrev = () => {
    if (!lesson || !lessons || lessons.length === 0) return;
    const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (currentIndex === -1) return;
    if (currentIndex > 0) {
      const prevLesson = lessons[currentIndex - 1];
      setSelectLesson(prevLesson); // Update the selected lesson
      setActiveIndex(currentIndex - 1); // Update the active index
    }
  };
  return (
    <div className="flex flex-col w-full mt-5 h-auto max-md:h-auto">
      <div className="bg-bgSecondary  h-auto  rounded-2xl p-5">
        <h1 className="text-white font-Inter text-[32px] font-bold">
          {lesson ? lesson.question : "Loading..."}
        </h1>
        <p className="text-white font-Inter text-[20px] font-medium leading-9 mt-5">
          {lesson ? lesson.answer : "Loading..."}
        </p>
      </div>
      {/* Buttons Section */}
      <div className="flex justify-between max-sm:flex-col max-md:justify-center max-md:gap-4 max-sm:gap-2 items-center z-5 mt-5">
        <div>
          {/* Show "Mark As Complete" when lesson is NOT completed */}
          {!isCompleted ? (
            <button
              onClick={handleMarkAsComplete}
              className="cursor-pointer border-2 w-52  border-buttonColor text-buttonColor py-3 px-6 max-sm:px-4 text-[16px] max-sm:text-[14px] rounded-3xl font-Inter font-semibold">
              Mark As Complete
            </button>
          ) : (
            <>
              {/* Show "Completed" button when lesson is completed */}
              <button className="cursor-pointer w-44  bg-buttonColor text-bgPrimary py-3 text-[16px] max-sm:text-[14px] px-6 max-sm:px-4 rounded-3xl font-Inter font-semibold">
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
        {/* <button
          onClick={logout}
          className="text-buttonColor text-[16px] font-semibold max-sm:text-[12px] cursor-pointer">
          Log Out
        </button> */}
        {/* Next Button */}
        <div className="flex  max-md:flex-col">
          <button
            className="flex justify-center text-[16px] max-sm:text-[14px] items-center cursor-pointer text-buttonColor py-3 px-6 max-sm:px-4 rounded-3xl font-Inter font-semibold"
            onClick={handleGoPrev}>
            <LuMoveLeft className="mr-2 mt-[1px]" size={30} />
            Go Prev 
          </button>
          <button
            onClick={handleGoNext}
            className="flex justify-center text-[16px] max-sm:text-[14px] items-center cursor-pointer text-buttonColor py-3 px-6 max-sm:px-4 rounded-3xl font-Inter font-semibold">
            Go Next <LuMoveRight className="ml-2 mt-[1px]" size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
