package aircracker

import (
	"bytes"
	"os/exec"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Interface struct {
	Name string
	Mode string
	Info string
}

type NetSvc struct {
	Name string
	Loaded bool
	Active bool
	Status string
	Desc string
}

func (a *App) GetServices() ([]NetSvc, error) {
	runtime.LogInfo(a.ctx, "Enumerating wireless network services")

	cmd := exec.Command("systemctl", "list-units", "--type=service", "--state=running")

	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		runtime.LogError(a.ctx, err.Error())
		return nil, err
	}

	var services []NetSvc

	runtime.LogInfo(a.ctx, out.String())
	entries := strings.Split(out.String(), "\n")

	for _, entry := range entries {
		if strings.Contains(strings.ToLower(entry), "wpa") ||
		   strings.Contains(strings.ToLower(entry), "network") ||
		   strings.Contains(strings.ToLower(entry), "wifi") ||
		   strings.Contains(strings.ToLower(entry), "iwd") {
			fields := strings.Fields(entry)
			svc := NetSvc{
				fields[0],
				fields[1] == "loaded",
				fields[2] == "active",
				fields[3],
				strings.Join(fields[4:], " "),
			}
			services = append(services, svc)
		}
	}

	return services, err
}

// Enumerate available wireless network interfaces
// Returns a list of (Interface) objects
func (a *App) GetInterfaces() ([]Interface, error) {
	runtime.LogInfo(a.ctx, "Enumerating wireless interfaces using iwconfig")

	cmd := exec.Command("iwconfig")
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		return nil, err
	}

	var interfaces []Interface

	entries := strings.Split(out.String(), "\n\n")
	for _, entry := range entries {
		if entry == "" || strings.Contains(entry, "no wireless extensions") {
			continue
		}
		fields := strings.Fields(entry)
		ifname := fields[0]
		ifmode := "N/A"
		ifinfo := entry
		for _, field := range fields {
			if after, ok := strings.CutPrefix(field, "Mode:"); ok  {
				ifmode = after
			}
		}

		var newif Interface = Interface{ ifname, ifmode, ifinfo }
		interfaces = append(interfaces, newif)
		runtime.LogInfof(a.ctx, "Interface: %s, Mode: %s", ifname, ifmode)
	}
	return interfaces, err
} 


