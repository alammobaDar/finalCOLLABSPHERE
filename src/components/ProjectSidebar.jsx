import Button from "./Button";
import style from '../style/projectSidebar.module.css';
export default function ProjectSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <>
      <div class={style.sidebar}>
      <div class={style.titleLogo}>
        <h2 class={style.appTitle}>CollabSphere</h2>
      </div>
      <div>
        <p class={style.myWorkspace}>My Workspaces</p>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8 font-bold">
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <button
                class={style.projectButton}
                onClick={() => onSelectProject(project.id)}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div class="rounded-lg bg-gradient-to-tr from-gray-300 to-gray-500 shadow-lg shadow-[#a4a4a4,#ffffff]"></div>
    </div>
    </>
  );
}
