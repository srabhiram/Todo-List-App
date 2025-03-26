import React from "react";

const Sidebar = () => {
  return (
    <main>
      <aside className="ml-2">
        <h2 className="font-semibold text-lg   tracking-wide ">Filter</h2>
        {/* priority section */}
        <div className="my-3">
          <h2 className="font-semibold text-lg   tracking-wide ">Priority</h2>
          <ul>
            <li>High</li>
            <li>Medium</li>
            <li>Low</li>
          </ul>
        </div>
        {/* tags */}
        <div className="my-3">
          <h2 className="font-semibold text-lg   tracking-wide ">Tags</h2>
          <ul>
            <li>Tag 1</li>
            <li>Tag 2</li>
            <li>Tag 3</li>
          </ul>
        </div>
      </aside>
    </main>
  );
};

export default Sidebar;
