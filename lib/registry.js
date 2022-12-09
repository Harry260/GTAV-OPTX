import regedit from "regedit";

export default async function createValues(
  config = {
    opt: ["Settings", "Registry", "Disable HPET"],
    tier: 2,
    level: 1,
  },
  callback = console.log
) {
  try {
    await regedit.putValue(
      {
        "HKCU\\System\\GameConfigStore": {
          GameDVR_Enabled: {
            value: "00000000",
            type: "REG_DWORD",
          },
          GameDVR_HonorUserFSEBehaviorMode: {
            value: "00000001",
            type: "REG_DWORD",
          },
          GameDVR_DXGIHonorFSEWindowsCompatible: {
            value: "00000001",
            type: "REG_DWORD",
          },
          GameDVR_FSEBehaviorMode: {
            value: "00000002",
            type: "REG_DWORD",
          },
          GameDVR_FSEBehavior: {
            value: "00000002",
            type: "REG_DWORD",
          },
        },

        "HKLM\\SOFTWARE\\Microsoft\\PolicyManager\\default\\ApplicationManagement\\AllowGameDVR":
          {
            value: {
              value: "00000000",
              type: "REG_DWORD",
            },
          },
        "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games":
          {
            "GPU Priority": {
              value: "00000008",
              type: "REG_DWORD",
            },
            Priority: {
              value: "00000006",
              type: "REG_DWORD",
            },
            "Scheduling Category": {
              value: "High",
              type: "REG_SZ",
            },
            "SFIO Priority": {
              value: "High",
              type: "REG_SZ",
            },
          },
      },
      () => {}
    );

    if (config.tier === 1 || config.tier === 2 || config.tier === 3) {
      await regedit.putValue(
        {
          "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile":
            {
              SystemResponsiveness: {
                value: "00000001",
                type: "REG_DWORD",
              },
            },
        },
        () => {}
      );
    } else {
      await regedit.putValue(
        {
          "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile":
            {
              SystemResponsiveness: {
                value: "00000000",
                type: "REG_DWORD",
              },
            },
        },
        () => {}
      );
    }

    callback(true);
  } catch (error) {
    callback(false);
  }
}
